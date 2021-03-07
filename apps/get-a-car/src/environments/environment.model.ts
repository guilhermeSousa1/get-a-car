/**
 * Interface that models an environment.
 */
export interface Environment {
  /** Indicate if it's a production environment */
  production: boolean;
  /** Environment name */
  name: string;
  /** Environment url */
  url: string;
}
