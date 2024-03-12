import { Models } from "appwrite"

export interface IUser extends Models.Document {
  name: string
  email: string
  password: string
  imageUrl?: string
}

export interface RegisterProps {
  name: string
  email: string
  password: string
}