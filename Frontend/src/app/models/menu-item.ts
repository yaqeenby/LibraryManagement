import { ActiveRouting } from "../enums/active-routing.enum";

export interface MenuItem {
  id: ActiveRouting,
  label: string,
  icon: string,
  route?: string
}
