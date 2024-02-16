type Role = 'user' | 'assistant' | 'update_map' | 'add_marker' | 'loader' | 'file-up' | 'file' | 'search' | 'plane-takeoff' | 'plane-landing'

export type Message = {
  id: string
  content: string
  role: Role
}
