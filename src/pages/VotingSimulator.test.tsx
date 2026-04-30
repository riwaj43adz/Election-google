import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VotingSimulator from '../pages/VotingSimulator';

// Mocking useSimulationStore
vi.mock('../store/useSimulationStore', () => ({
  useSimulationStore: () => ({
    system: 'FPTP',
    candidates: [
      { id: '1', name: 'Test Candidate', party: 'Test Party', votes: 0, color: '#000' }
    ],
    totalVotes: 0,
    addVote: vi.fn(),
    resetSimulation: vi.fn(),
  })
}));

describe('VotingSimulator', () => {
  it('renders candidate names', () => {
    render(<VotingSimulator />);
    expect(screen.getAllByText('Test Candidate')[0]).toBeInTheDocument();
  });
});
