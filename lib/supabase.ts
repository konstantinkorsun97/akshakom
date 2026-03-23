import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Product = {
  id: number
  zal_bil_id: string
  article: string
  filial_id: number
  open_date: string
  estimate_sum: number
  proba: number
  weight_with_stone: number
  weight_without_stone: number
  description_raw: string
  name_display: string
  condition: string
  defects: string
  is_active: boolean
}
export async function getPhotosByCategory(category: string): Promise<string[]> {
  const { data } = await supabase.storage
    .from('jewelry-photos')
    .list(category)
  
  if (!data || data.length === 0) return []
  
  return data.map(file => 
    `https://ytzprqintfhkmalsyjuj.supabase.co/storage/v1/object/public/jewelry-photos/${category}/${file.name}`
  )
}