import { render, screen } from '@testing-library/react';
import App from './App';

describe("List page", ()=>{
  it('navbar task manager is visible', () => {
    render(<App />);
    const item = screen.getByRole('link', {
      name: /task manager app/i
    });
    expect(item).toBeInTheDocument();
  });
  
  it('navbar task manager is visible', () => {
    render(<App />);
    const item = screen.getByRole('link', {
      name: /create/i
    });
    expect(item).toBeInTheDocument();
  });

  it('task header is present', () => {
    render(<App />);
    const item = screen.getByRole('heading', {
      name: /your daily tasks/i
    })
    expect(item).toBeInTheDocument();
  });

  it('task table header is present', async() => {
    render(<App />);
    const title = await screen.findByRole('columnheader', {
      name: /title/i
    });
    const priority = await screen.findByRole('columnheader', {
      name: /priority/i
    });
    const status = await screen.findByRole('columnheader', {
      name: /status/i
    });

    expect(title).toBeInTheDocument();
    expect(priority).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });
})

