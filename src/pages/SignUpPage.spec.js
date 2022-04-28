import SignUpPage from "./SignUpPage.svelte";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import "whatwg-fetch";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("sign up page", () => {
	describe("layout", () => {
		it("has Sign Up header", () => {
			render(SignUpPage);
			const header = screen.getByRole("heading", { name: "Sign Up" });
			// expect(header).toBeTruthy();
			expect(header).toBeInTheDocument();
		});

		it("has username input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("Username");
			expect(input).toBeInTheDocument();
		});
		it("has email input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("E-mail");
			expect(input).toBeInTheDocument();
		});
		it("has password input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("Password");
			expect(input).toBeInTheDocument();
		});
		it("has password type for password input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("Password");
			expect(input.type).toBe("password");
		});
		it("has password repeat input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("Password Repeat");
			expect(input).toBeInTheDocument();
		});
		it("has password repeat type for password input", () => {
			render(SignUpPage);
			const input = screen.getByLabelText("Password Repeat");
			expect(input.type).toBe("password");
		});
		it("has Sign Up button", () => {
			render(SignUpPage);
			const button = screen.getByRole("button", { name: "Sign Up" });
			// expect(header).toBeTruthy();
			expect(button).toBeInTheDocument();
		});
		it("disables the button initially", () => {
			render(SignUpPage);
			const button = screen.getByRole("button", { name: "Sign Up" });
			// expect(header).toBeTruthy();
			expect(button).toBeDisabled();
		});
	});

	describe("interactions", () => {
		it("enables the button when the password and password repeat fields → same value", async () => {
			render(SignUpPage);
			const passwordRepeatInput = screen.getByLabelText("Password Repeat");
			const passwordInput = screen.getByLabelText("Password");
			await userEvent.type(passwordInput, "p4ssword");
			await userEvent.type(passwordRepeatInput, "p4ssword");

			// expect(passwordInput).toHaveValue("p4ssword");
			const button = screen.getByRole("button", { name: "Sign Up" });
			expect(button).toBeEnabled();
		});
		it("sends username, email, and password to back end after clicking button", async () => {
			let requestBody;
			const server = setupServer(
				rest.post("/api.1.0/users", (req, res, ctx) => {
					console.log("This line is run");
					requestBody = req.body;
					return res(ctx.status(200));
				})
			);

			server.listen();

			render(SignUpPage);
			const usernameInput = screen.getByLabelText("Username");
			const emailInput = screen.getByLabelText("E-mail");
			const passwordInput = screen.getByLabelText("Password");
			const passwordRepeatInput = screen.getByLabelText("Password Repeat");

			await userEvent.type(usernameInput, "user1");
			await userEvent.type(emailInput, "user1@mail.com");
			await userEvent.type(passwordInput, "p4ssword");
			await userEvent.type(passwordRepeatInput, "p4ssword");

			// create mock function → set post request
			// const mockFn = jest.fn();
			// axios.post = mockFn;
			// window.fetch = mockFn;

			const button = screen.getByRole("button", { name: "Sign Up" });
			await userEvent.click(button);

			// post(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>>
			// const post = mockFn.mock.calls[0];
			// const body = JSON.parse(post[1].body);

			await server.close();

			expect(requestBody).toEqual({
				username: "user1",
				email: "user1@mail.com",
				password: "p4ssword",
			});
		});
	});
});

/*

	// query input 
	const { container } = render(SignUpPage);			
	const input = container.querySelector("input");
	expect(input).toBeInTheDocument();

	// by placeholder 
	render(SignUpPage);
	const input = screen.getByPlaceholderText("username");
	expect(input).toBeInTheDocument();

*/
