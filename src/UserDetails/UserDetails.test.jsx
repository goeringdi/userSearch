import React from "react";
import { render, waitFor } from "@testing-library/react";
import UserDetails from "./UserDetails";
import { useParams, useNavigate } from "react-router-dom";
import { queryByText } from "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn()
}));

test("displays user details after fetching data", async () => {
  const mockedUsername = "john";
  useParams.mockReturnValue({ username: mockedUsername });

  const mockedUserDetails = {
    name: "John Doe",
    followers: 10,
    public_repos: 5
  };
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(mockedUserDetails)
  });

  const { queryByText } = render(<UserDetails />);

  await waitFor(() => {
    expect(queryByText(mockedUserDetails.name)).toBeInTheDocument();
    expect(queryByText(`Подписчики: ${mockedUserDetails.followers}`)).toBeInTheDocument();
    expect(queryByText(`Публичные репозитории: ${mockedUserDetails.public_repos}`)).toBeInTheDocument();
  });
});
