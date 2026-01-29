import { useState } from "react";
import { api } from "../utils/axios.jsx"; // Adjust path if needed
import { useNavigate, Link } from "react-router-dom";
import { Logo } from "../components/Logo.jsx";

export function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSignup() {
        try {
            await api.post("/signup", { 
                username, 
                email, 
                password 
            });
            alert("Signup successful! Please sign in.");
            navigate("/signin");
        } catch (error) {
            console.error(error);
            alert("Signup Failed! Check console for details.");
        }
    }

    return (
        // MAIN CONTAINER: Full screen, gray background, flex column
        <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-hidden">
            
            {/* BACKGROUND GRID (Consistent with Signin) */}
            <div className='absolute inset-0 z-0 w-full h-full pointer-events-none text-slate-600'>
                <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                    <defs>
                        <pattern id='custom-grid' width='50' height='50' patternUnits='userSpaceOnUse'>
                            <path
                                d='M 50 0 L 0 0 0 50'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='1' 
                                opacity='0.2'
                            />
                        </pattern>
                    </defs>
                    <rect width='100%' height='100%' fill='url(#custom-grid)' />
                </svg>
            </div>

            {/* TOP SECTION: Holds the "Oink" text */}
            <div className='flex-1 flex justify-center items-end pb-8 z-10 gap-4'>
                <Logo />
                <span className="text-7xl font-bold text-slate-800 tracking-tighter">
                    Oink
                </span>
            </div>

            {/* BOTTOM SECTION: Holds the Form */}
            <div className="flex-[2] flex justify-center items-start z-20">
                <div className="bg-white p-8 rounded-lg shadow-md w-80">
                    <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                    
                    <input 
                        placeholder="Username" 
                        className="w-full p-2 border mb-2 rounded"
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        placeholder="Email" 
                        className="w-full p-2 border mb-2 rounded"
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="w-full p-2 border mb-4 rounded"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    
                    {/* Swipe Fill Button */}
                    <button 
                        onClick={handleSignup}
                        className="group relative w-full overflow-hidden rounded bg-purple-600 p-2 text-white cursor-pointer mt-2"
                    >
                        <div className="absolute inset-0 w-0 bg-purple-700 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                        <span className="relative">Sign up</span>
                    </button>

                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}