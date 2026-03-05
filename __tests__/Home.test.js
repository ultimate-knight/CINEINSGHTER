import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Home from "../src/app/page"

jest.mock("next/image", () => (props) => {
  return <img {...props} />
})


test("renders CineInsight title", () => {
  render(<Home />)

  const title = screen.getByText(/CINEINSIGHT/i)

  expect(title).toBeInTheDocument()
})