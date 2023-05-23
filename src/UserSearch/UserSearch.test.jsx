import { render, screen, fireEvent } from "@testing-library/react";
import UserSearch from "./UserSearch";

test("updates query state when input changes", () => {
  render(<UserSearch />);
  const input = screen.getByLabelText(/Введите имя пользователя/i);
  fireEvent.change(input, { target: { value: "new query" } });
  expect(input.value).toBe("new query");
});

test("changes order state when sort button is clicked", () => {
  render(<UserSearch />);
  const button = screen.getByText(/Сортировать \(по возрастанию\)/i);
  fireEvent.click(button);
  expect(screen.getByText(/Сортировать \(по убыванию\)/i)).toBeInTheDocument();
  fireEvent.click(button);
  expect(screen.getByText(/Сортировать \(по возрастанию\)/i)).toBeInTheDocument();
});