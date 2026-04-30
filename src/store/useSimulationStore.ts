import { create } from 'zustand';

export type VotingSystem = 'FPTP' | 'RCV' | 'PR';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  votes: number;
  color: string;
}

interface SimulationState {
  system: VotingSystem;
  candidates: Candidate[];
  totalVotes: number;
  setSystem: (system: VotingSystem) => void;
  addVote: (candidateId: string) => void;
  resetSimulation: () => void;
}

const initialCandidates: Candidate[] = [
  { id: '1', name: 'Aria Sterling', party: 'Visionary Party', votes: 0, color: '#4285F4' },
  { id: '2', name: 'Julian Vance', party: 'Equality Alliance', votes: 0, color: '#EA4335' },
  { id: '3', name: 'Maya Chen', party: 'Sustainability Group', votes: 0, color: '#34A853' },
  { id: '4', name: 'Leo Thorne', party: 'Liberty Union', votes: 0, color: '#FBBC05' },
];

export const useSimulationStore = create<SimulationState>((set) => ({
  system: 'FPTP',
  candidates: initialCandidates,
  totalVotes: 0,
  setSystem: (system) => set({ system }),
  addVote: (candidateId) => set((state) => ({
    candidates: state.candidates.map(c => 
      c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
    ),
    totalVotes: state.totalVotes + 1
  })),
  resetSimulation: () => set({ candidates: initialCandidates, totalVotes: 0 }),
}));
