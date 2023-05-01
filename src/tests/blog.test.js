import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from '../components/Blog';
import userEvent from '@testing-library/user-event';
import AddBlog from '../components/AddBlog';

const blog = {
	'title': 'React Js',
	'author': 'Joe',
	'url': 'https://www.react.org',
	'likes': 0,
	'user': {
		'username': 'samjoea',
		'name': 'Joseph Sam',
		'blogs': [
			'64459748bc867d88ce03acc9'
		],
		'id': '643e5c9c79a1579ca1e84a2c'
	},
	'id': '64459748bc867d88ce03acc9'
};

describe('Blog', () => {
	test('Blog renders the title and author, but does not render its url or number of likes by default', () => {
		const { container } = render(<Blog blog={blog} />);
		const div = container.querySelector('.blog');
		const div1 = container.querySelector('.more-blog-info');
		expect(div).toHaveTextContent('React Js Joe');
		expect(div1).toHaveStyle('display: none');
	});

	test('Blog renders its url and number of likes when the button controlling the shown details has been clicked', async () => {
		const { container } = render(<Blog blog={blog} />);
		const user = userEvent.setup();
		const button = container.querySelector('.blog').firstElementChild;
		const div = container.querySelector('.more-blog-info');
		await user.click(button);

		expect(div).not.toHaveStyle('display: none');
	});

	test('If the like button is clicked twice, the event handler the component received as props is called twice', async () => {
		const mockHandler = jest.fn();
		render(<Blog blog={blog} addLikes={mockHandler} />);
		const user = userEvent.setup();
		const button = screen.getByText('like');
		const num = 2;
		for (let i = 0; i < num; i++) {
			await user.click(button);
		}

		expect(mockHandler.mock.calls).toHaveLength(num);
	});

	test('calls the event handler it received as props with the right blog details', async () => {
		const mockHandler = jest.fn();

		const handleAddBlog = (e, inputData) => {
			e.preventDefault();
			mockHandler(inputData);
		};
		const handleChange = (event, ref) => {
			const name = event.target.name;
			const value = event.target.value;
			ref[name] = value;
		};
		const { container } = render(<AddBlog handleAddBlog={handleAddBlog} handleChange={handleChange} />);
		const user = userEvent.setup();
		const titleInput = container.querySelector('input[name="title"]');
		const authorInput = container.querySelector('input[name="author"]');
		const urlInput = container.querySelector('input[name="url"]');
		const submit = container.querySelector('button[type="submit"]');
		await user.type(titleInput, 'Angular Js');
		await user.type(authorInput, 'JoeSam');
		await user.type(urlInput, 'https://www.angular.org');
		await user.click(submit);

		expect(mockHandler.mock.calls).toHaveLength(1);
		expect(mockHandler.mock.calls[0][0]).toEqual({
			'title': 'Angular Js',
			'author': 'JoeSam',
			'url': 'https://www.angular.org'
		});

	});
});
