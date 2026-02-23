export type Cat = {
    id: string;
    url: string;
    width: number;
    height: number;
    sub_id: string;
    created_at: string;
    original_filename: string;
    breeds: Array<Breed>;
}

type Breed = {
    weight: Weight;
    id: string;
    name: string;
    temperament: string;
    origin: string;
    country_codes: string;
    life_span: string;
    wikipedia_url: string;
}

type Weight = {
    imperial: string;
    metric: string;
}
