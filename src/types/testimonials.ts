
export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  location?: string;
  position?: string;  // Adicionado para retrocompatibilidade
  author?: string;    // Adicionado para retrocompatibilidade
}
