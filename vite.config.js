import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:'./' github دا لو مش هربط بال 
  //github دا لما اربط بال 
 base: '/vite_Todolist/',
})
