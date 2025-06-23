'use client'

import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const getAllData = async <T>(url: string): Promise<T[]> => {
  const res = await axios.get(`${API_URL}${url}`)
  return res.data
}

export const createData = async (url: string, data: object) => {
  const res = await axios.post(`${API_URL}${url}`, data)
  return res.data
}

export const updateData = async (url: string, id: number, data: object) => {
  const res = await axios.put(`${API_URL}${url}/${id}`, data)
  return res.data
}

export const deleteData = async (url: string, id: number) => {
  const res = await axios.delete(`${API_URL}${url}/${id}`)
  return res.data
}
