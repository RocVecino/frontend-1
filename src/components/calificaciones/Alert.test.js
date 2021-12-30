import React from "react";
import Alert from "./Alert";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = document.createElement("div");
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renders the message", () => {
    var message = "Hello";
    act(() => {
        render( <Alert message={message} onClose={jest.fn()} />, container);
    });
    expect(container.hasChildNodes()).toBe(true);
    expect(container.textContent).toEqual(expect.stringContaining("¡Error! "+message));
});

it("It does not renders if message is null", () => {
    act(() => {
        render( <Alert message={null} onClose={jest.fn()} />, container);
    });
    expect(container.hasChildNodes()).toBe(false);
});


if("Sends event if button is clcked", () => {
    const onClose = jest.fn();
    act(() => {
        render( <Alert message="test" onClose={onClose} />, container);
    });

    const button = document.querySelector("[data-test-id='close']");

    act(() => {
        button.dispatchEvent(new MouseEvent("click", {bubbles: true}));
    });

    expect(onClose).toHaveBeenCalledTimes(1);
});
