import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UserSearch from "./UserSearch";
import { fireEvent } from "@testing-library/react";


test("toggles order state on sort button click", () => {
  const { getByText } = render(
    <MemoryRouter>
      <UserSearch />
    </MemoryRouter>
  );

  const sortButton = getByText("Сортировать (по возрастанию)");

  fireEvent.click(sortButton);

  expect(sortButton.textContent).toBe("Сортировать (по убыванию)");

  fireEvent.click(sortButton);

  expect(sortButton.textContent).toBe("Сортировать (по возрастанию)");
});

test("calls navigate function on user item click", async () => {
  const { queryByText } = render(
    <MemoryRouter>
      <UserSearch />
    </MemoryRouter>
  );

  const userItem = await waitFor(() => queryByText("exampleUser"));

  userEvent.click(userItem);

});