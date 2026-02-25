import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CatCard } from './CatCard'

const { mockSetFavourite, mockDeleteFavourite, mockSetVote } = vi.hoisted(() => ({
  mockSetFavourite: vi.fn(),
  mockDeleteFavourite: vi.fn(),
  mockSetVote: vi.fn(),
}))

vi.mock('../services/favourite', () => ({
  setFavourite: mockSetFavourite,
  deleteFavourite: mockDeleteFavourite,
}))

vi.mock('../services/vote', () => ({
  setVote: mockSetVote,
}))

const defaultProps = {
  url: 'https://example.com/cat.jpg',
  filename: 'fluffy.jpg',
  width: 400,
  height: 300,
  isFavourite: false,
  votes: 5,
  id: 'cat-123',
  favouriteId: 0,
}

const getButtons = () => {
  const buttons = screen.getAllByRole('button')
  return { heart: buttons[0], upvote: buttons[1], downvote: buttons[2] }
}

beforeEach(() => {
  cleanup()
  vi.clearAllMocks()
  mockSetVote.mockResolvedValue({ status: 'success', data: { value: 1 } })
  mockSetFavourite.mockResolvedValue({ status: 'success', data: { id: 99, message: 'SUCCESS' } })
  mockDeleteFavourite.mockResolvedValue({ status: 'success', data: { id: 42, message: 'SUCCESS' } })
})

describe('CatCard', () => {
  it('renders image, filename, and vote count', () => {
    render(<CatCard {...defaultProps} />)

    const img = screen.getByAltText('fluffy.jpg')
    expect(img).toHaveAttribute('src', 'https://example.com/cat.jpg')
    expect(screen.getByText('fluffy.jpg')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('shows unfilled heart when not favourited and filled heart when favourited', () => {
    const { unmount } = render(<CatCard {...defaultProps} isFavourite={false} />)
    expect(getButtons().heart.className).toContain('text-gray-400')
    unmount()

    render(<CatCard {...defaultProps} isFavourite={true} favouriteId={42} />)
    expect(getButtons().heart.className).toContain('text-red-500')
  })

  it('calls setFavourite when clicking an unfavourited heart', async () => {
    const user = userEvent.setup()
    render(<CatCard {...defaultProps} isFavourite={false} />)

    await user.click(getButtons().heart)

    expect(mockSetFavourite).toHaveBeenCalledWith('cat-123')
  })

  it('calls deleteFavourite when clicking a favourited heart', async () => {
    const user = userEvent.setup()
    render(<CatCard {...defaultProps} isFavourite={true} favouriteId={42} />)

    await user.click(getButtons().heart)

    expect(mockDeleteFavourite).toHaveBeenCalledWith(42)
  })

  it('calls setVote with +1 on upvote and -1 on downvote', async () => {
    const user = userEvent.setup()
    render(<CatCard {...defaultProps} />)

    await user.click(getButtons().upvote)
    expect(mockSetVote).toHaveBeenCalledWith('cat-123', 1)

    mockSetVote.mockClear()
    await user.click(getButtons().downvote)
    expect(mockSetVote).toHaveBeenCalledWith('cat-123', -1)
  })

  it('updates vote count on successful vote', async () => {
    const user = userEvent.setup()
    render(<CatCard {...defaultProps} votes={5} />)

    await user.click(getButtons().upvote)

    await waitFor(() => {
      expect(screen.getByText('6')).toBeInTheDocument()
    })
  })

  it('does not update vote count on failed vote', async () => {
    mockSetVote.mockResolvedValue({ status: 'failure', error: 'fail' })
    const user = userEvent.setup()
    render(<CatCard {...defaultProps} votes={5} />)

    await user.click(getButtons().upvote)

    await waitFor(() => {
      expect(mockSetVote).toHaveBeenCalledOnce()
    })
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
