"use server"

import { redirect } from "next/navigation";

export default async function formFilter(formData){
  const priceMin = formData.get('price_min');
  const priceMax = formData.get('price_max');
  const category = formData.get('category');
  const search = formData.get('search');

  const query = [];

  if (category) {
    query.push(`category=${category}`);
  }
  if (priceMin) {
    query.push(`price_min=${priceMin}`);
  }
  if (priceMax) {
    query.push(`price_max=${priceMax}`);
  }
  if(search) {
    query.push(`search=${search}`)
  }

  const parameters = query.join('&')

  return redirect(`/products/?${parameters}`)
}