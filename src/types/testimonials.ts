
export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  location?: string;
  position?: string;  // For backward compatibility
  author?: string;    // For backward compatibility
}
