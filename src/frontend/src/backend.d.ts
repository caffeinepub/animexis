import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ColorPalette {
    accent: string;
    background: string;
    text: string;
    secondary: string;
    primary: string;
}
export interface AnimeEntry {
    id: bigint;
    title: string;
    summary: string;
    genre: string;
    colorPalette: ColorPalette;
    posterUrl: string;
    animationPreset: string;
}
export interface backendInterface {
    addAnime(entry: AnimeEntry): Promise<void>;
    deleteAnime(id: bigint): Promise<void>;
    getAllAnime(): Promise<Array<AnimeEntry>>;
    getAnimeByGenre(genre: string): Promise<Array<AnimeEntry>>;
    getAnimeById(id: bigint): Promise<AnimeEntry>;
    getColorPalettes(): Promise<Array<ColorPalette>>;
    getGenres(): Promise<Array<string>>;
    initialize(): Promise<void>;
    updateAnime(id: bigint, entry: AnimeEntry): Promise<void>;
}
