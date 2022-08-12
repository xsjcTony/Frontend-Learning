import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '@/App'
import { render, screen } from '@/test/utils'


describe('App', () => {
  it('Title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Vite \+ React/)).toBeInTheDocument()
  })

  it('Counter should increment on click', async () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /^count is/ })
    await userEvent.click(button)
    expect(await screen.findByText(/count is 1/)).toBeInTheDocument()
  })
})
