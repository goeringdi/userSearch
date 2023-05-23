import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockUser = {
  name: "user1",
  followers: 10,
  public_repos: 5,
};

test("displays user details when a user is selected", async () => {
  render(
    <MemoryRouter initialEntries={['/user/user1']}>
      <Routes>
        <Route path="/user/:username" element={<UserDetails user={mockUser} />} />
      </Routes>
    </MemoryRouter>
  );

  const userName = screen.getByRole('heading', { name: /user1/i });
  const followers = screen.getByText((content, element) => {
    const text = element.textContent || "";
    return text.includes("Подписчики:") && text.includes("10");
  });
  const publicRepos = screen.getByText((content, element) => {
    const text = element.textContent || "";
    return text.includes("Публичные репозитории:") && text.includes("5");
  });

  expect(userName).toBeInTheDocument();
  expect(followers).toBeInTheDocument();
  expect(publicRepos).toBeInTheDocument();
});