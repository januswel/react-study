import React from "react";
import { render, screen } from "@testing-library/react";
import Profile, { useControlledComponent } from "./Profile";
import { renderHook, act } from "@testing-library/react-hooks";

describe("Profile", () => {
  it("renders items", () => {
    render(<Profile />);
    const items = screen.getAllByTestId("item");
    expect(items).toHaveLength(2);
    items.forEach((i) => {
      expect(i.querySelectorAll("input")).toHaveLength(1);
      expect(i.querySelectorAll("p")).toHaveLength(1);
    });
  });
  it("renders customhook", async () => {
    const { result } = renderHook(() =>
      useControlledComponent("CX Department")
    );

    act(() => {
      result.current.onChange({
        target: { value: "update" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.value).toBe("update");
  });
});
