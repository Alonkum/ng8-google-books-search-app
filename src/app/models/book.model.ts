export class Book {
    constructor(
        public title?: string,
        public subtitle?: string,
        public authors?: string,
        public description?: string,
        public publishedDate? :string,
        public pageCount?: number | null,
        public previewLink?: string,
        public infoLink?: string,
        public averageRating?: number | null,
        public categories?: string[],
        public smallThumbnailUrl?: string
    ) {}
}