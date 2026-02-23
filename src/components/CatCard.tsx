type CatCardProps = {
    url: string;
}

export const CatCard = ({ url }: CatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <img
      src={url}
      alt="Uploaded cat"
      className="w-full h-60 object-cover"
    />
  </div>
);