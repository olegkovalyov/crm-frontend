import { ComponentType, LazyExoticComponent } from 'react';

export interface RouteInterface {
  // Path, like in basic prop
  path: string;
  // Exact, like in basic prop
  exact: boolean;

  // Lazy Loaded component
  // eslint-disable-next-line
  component?: LazyExoticComponent<ComponentType<any>>;
  // Redirect pathPart
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
}
