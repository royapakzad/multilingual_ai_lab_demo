
import React, { useState } from 'react';

interface LoginProps {
  onLoginSubmit: (teamName: string, password: string) => void;
  loginError: string | null;
}

// Demo login component - simplified for demo purposes
const Login: React.FC<LoginProps> = ({ onLoginSubmit, loginError }) => {
  const [teamName, setTeamName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSubmit(teamName, password);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="bg-card text-card-foreground p-8 md:p-12 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        <div className="text-center mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-primary mx-auto mb-4">
            <path fillRule="evenodd" d="M8 10V7a4 4 0 118 0v3h1a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2h1zm4-6a2 2 0 00-2 2v3h4V7a2 2 0 00-2-2z" clipRule="evenodd" />
          </svg>
          <h1 className="text-3xl font-bold text-foreground">Multilingual AI Evaluation Lab</h1>
          <p className="text-muted-foreground mt-2">
            Enter your team name and the demo password to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="team_input" className="sr-only">Team Name</label>
            <input
              id="team_input"
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="form-input w-full px-4 py-3 border border-input bg-background text-foreground placeholder-muted-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all shadow-sm hover:border-accent"
              required
              autoFocus
              aria-label="Team name input"
            />
          </div>
          <div>
            <label htmlFor="password_input" className="sr-only">Password</label>
            <input
              id="password_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-input w-full px-4 py-3 border border-input bg-background text-foreground placeholder-muted-foreground rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent outline-none transition-all shadow-sm hover:border-accent"
              required
              aria-label="Password Input"
            />
          </div>
          {loginError && (
            <p className="text-sm text-destructive text-center">{loginError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-primary hover:opacity-90 text-primary-foreground font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 ease-in-out transform hover:-translate-y-px active:translate-y-0 active:shadow-md"
            aria-label="Submit credentials and enter lab"
          >
            Enter Demo
          </button>
        </form>
      </div>
       <p className="text-center text-xs text-muted-foreground mt-8 max-w-sm">
        Demo version - Enter any team name and password to access the lab. All evaluations are shared between teams.
      </p>
      <p className="text-center text-xs text-muted-foreground mt-4 max-w-sm">
        <a href="https://www.multilingualailab.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Check out the project website</a>
      </p>
      <p className="text-center text-xs text-muted-foreground mt-2 max-w-sm">
        <a href="https://github.com/royapakzad/llm-multilingual-evaluation-lab" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Check out source code from GitHub</a>
      </p>
    </div>
  );
};

export default Login;
