import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./application/App";
import { useCachingFetch } from "./caching-fetch-library/cachingFetch";
import { validateData } from "./application/validation";

// Mocking dependencies
jest.mock("./caching-fetch-library/cachingFetch");
jest.mock("./application/validation");
//jest.mock("./Person", () => jest.fn(() => <div>Person Component</div>));

describe("App Component", () => {
  it("renders loading state initially", () => {
    useCachingFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<App />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when an error occurs", () => {
    useCachingFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: "Failed to fetch data" },
    });

    render(<App />);
    expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
  });

  it("renders list of people when data is fetched and validated successfully", async () => {
    const mockData = [
      { email: "person1@example.com" },
      { email: "person2@example.com" },
    ];

    useCachingFetch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    validateData.mockReturnValue(mockData);

    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText("Welcome to the People Directory")
      ).toBeInTheDocument()
    );
  });

  it("calls preload data function correctly", async () => {
    const preloadSpy = jest.spyOn(App, "preLoadServerData");

    await App.preLoadServerData();

    expect(preloadSpy).toHaveBeenCalled();
  });
});
