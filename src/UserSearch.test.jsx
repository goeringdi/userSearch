import { render, fireEvent, waitFor } from "@testing-library/react";
import UserSearch from "./UserSearch";

test("updates query state when input changes", () => {
  const { getByLabelText } = render(<UserSearch />);
  const input = getByLabelText(/search/i);
  fireEvent.change(input, { target: { value: "new query" } });
  expect(input.value).toBe("new query");
});

test("changes order state when sort button is clicked", () => {
  const { getByText } = render(<UserSearch />);
  const button = getByText(/sort/i);
  fireEvent.click(button);
  expect(button.textContent).toBe("Sort: desc");
});

test("displays user details when a user is selected", async () => {
    // Мокаем API запрос
    axios.get.mockResolvedValueOnce({
      data: {
        items: [
          {
            login: "user1",
            followers: 10,
            public_repos: 5,
          },
        ],
      },
    });
  
    const { getByText, findByText } = render(<UserSearch />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'user1' } });
    fireEvent.click(getByText(/Search/i));
  
    fireEvent.click(getByText(/user1/i));
  
    const followers = await findByText(/Followers: 10/i);
    const publicRepos = await findByText(/Public Repos: 5/i);
    
    expect(followers).toBeInTheDocument();
    expect(publicRepos).toBeInTheDocument();
  });