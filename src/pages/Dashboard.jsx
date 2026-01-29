import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { api } from "../utils/axios";
import { Plus, Trash, Brain, LogOut, Search } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import { Logo } from "../components/Logo";
// import { BackgroundPattern } from "../components/BG"; // You can remove this if unused

const markdownComponents = {
    // Custom bold style
    strong: ({ children }) => <span className="font-bold text-black">{children}</span>,
    // Custom list style
    ul: ({ children }) => <ul className="list-disc pl-4 mb-4">{children}</ul>,
    // Custom header style
    h2: ({ children }) => <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>,
    // Ensure links open in new tabs
    a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-blue-600 underline">{children}</a>
};

export function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    
    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // "Second Brain" AI State
    const [question, setQuestion] = useState("");
    const [aiAnswer, setAiAnswer] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);

    // Form State
    const [newTitle, setNewTitle] = useState("");
    const [newLink, setNewLink] = useState("");
    const [newTags, setNewTags] = useState("");

    // 1. Fetch Content on Load
    useEffect(() => {
        refreshNotes();
    }, []);

    async function refreshNotes() {
        try {
            const res = await api.get("/content");
            setNotes(res.data.message);
            setIsSearching(false); 
        } catch (e) {
            console.error(e);
        }
    }

    // 2. Search Function
    async function handleSearch() {
        if (!searchQuery.trim()) {
            refreshNotes(); 
            return;
        }

        try {
            const res = await api.get(`/search?q=${searchQuery}`);
            setNotes(res.data.data); 
            setIsSearching(true);
        } catch (e) {
            console.error("Search failed", e);
            alert("No results found or search failed");
        }
    }

    function logout() {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    async function addNote() {
        await api.post("/content", {
            title: newTitle,
            link: newLink,
            tags: newTags.split(",").map(t => t.trim()),
            platform: "web",
            colour: "blue"
        });
        setModalOpen(false);
        refreshNotes();
    }

    async function askBrain() {
        setLoadingAi(true);
        setAiAnswer("");
        try {
            const res = await api.post("/ask", { question });
            // SAFETY CHECK: Ensure we only pass strings to ReactMarkdown
            const answer = typeof res.data.answer === 'string' ? res.data.answer : "No valid answer received.";
            setAiAnswer(answer);
        } catch (e) {
            setAiAnswer("Error fetching answer.");
        }
        setLoadingAi(false);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className='fixed inset-0 z-0 min-h-screen w-full text-slate-600 pointer-events-none'>
                <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                    <defs>
                        <pattern id='custom-grid' width='50' height='50' patternUnits='userSpaceOnUse'>
                            <path
                                d='M 50 0 L 0 0 0 50'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='1'  // <--- FIXED: stroke-width to strokeWidth
                                opacity='0.2'
                            />
                        </pattern>
                    </defs>
                    <rect width='100%' height='100%' fill='url(#custom-grid)' />
                </svg>
            </div>

            {/* Header - Added relative z-10 to make it clickable */}
            <div className="flex justify-between items-center mb-8 relative z-10">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Logo className="w-12 h-20 text-purple-600" />
                    Oink
                </h1>
                
                <div className="flex gap-2 bg-white rounded-lg">
                    {/* Search Bar */}
                    <div className="flex border border-gray-300 rounded-xl overflow-hidden bg-white">
                        <input 
                            className="px-3 py-2 outline-none text-gray-700 w-48"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch()}}}
                        />
                        <button 
                            onClick={handleSearch}
                            className="bg-gray-100 hover:bg-gray-200 px-3 border-l text-gray-600 cursor-pointer"
                        >
                            <Search size={18} />
                        </button>
                    </div>

                    <button 
                        onClick={() => setModalOpen(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition cursor-pointer"
                    >
                        <Plus size={18} /> Add Content
                    </button>
                    
                    <button 
                        onClick={logout}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-500 hover:text-black transition-all duration-500 cursor-pointer"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {/* AI Search Section */}
            <div className="p-6 rounded-xl shadow-sm border mb-8 bg-white relative z-10">
                <h2 className="text-xl font-semibold mb-4">Ask your Database</h2>
                <div className="flex gap-2">
                    <input 
                        className="flex-1 border p-2 rounded bg-white"
                        placeholder="e.g., How does the React vulnerability work?"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter') {
                                askBrain()
                            }
                        }}
                    />
                    <button 
                        onClick={askBrain}
                        disabled={loadingAi}
                        className="bg-slate-800 text-white px-6 rounded hover:bg-slate-700 cursor-pointer"
                    >
                        {loadingAi ? "Thinking..." : "Ask"}
                    </button>
                </div>
                {aiAnswer && (
                    <div className="mt-4 p-4 rounded border prose max-w-none bg-white">
                        <div className="prose max-w-none text-slate-700">
                            <ReactMarkdown components={markdownComponents}>
                                {aiAnswer}
                            </ReactMarkdown>
</div>
                    </div>
                )}
            </div>

            {/* Status Message */}
            {isSearching && (
                <div className="mb-4 flex justify-between items-center text-gray-600 relative z-10">
                    <p>Found {notes.length} results for "{searchQuery}"</p>
                    <button onClick={refreshNotes} className="text-blue-500 hover:underline text-sm">Clear Search</button>
                </div>
            )}

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                {notes.map((note) => (
                    <div key={note._id} className="bg-white p-4 rounded-lg shadow border h-64 overflow-hidden flex flex-col hover:shadow-md transition">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg mb-2 truncate pr-2">{note.title}</h3>
                            <Trash 
                                size={16} 
                                className="text-gray-400 cursor-pointer hover:text-red-500 flex-shrink-0"
                                onClick={async () => {
                                    if(confirm("Are you sure you want to delete this note?")) {
                                        await api.delete("/content", { data: { contentId: note._id } });
                                        if (isSearching) handleSearch(); 
                                        else refreshNotes();
                                    }
                                }}
                            />
                        </div>
                        <a href={note.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm mb-2 truncate block hover:underline transition-all duration-500">
                            {note.link}
                        </a>
                        <p className="text-gray-600 text-sm flex-1 overflow-auto custom-scrollbar">
                            {note.text ? note.text.substring(0, 150) + "..." : "No preview available."}
                        </p>
                        <div className="mt-2 flex gap-1 flex-wrap">
                            {note.tags.map(tag => (
                                <span key={tag} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Add New Note</h2>
                        <input placeholder="Title" className="w-full border p-2 mb-2 rounded" onChange={e => setNewTitle(e.target.value)} />
                        <input placeholder="Link" className="w-full border p-2 mb-2 rounded" onChange={e => setNewLink(e.target.value)} />
                        <input placeholder="Tags (comma separated)" className="w-full border p-2 mb-4 rounded" onChange={e => setNewTags(e.target.value)} />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                            <button onClick={addNote} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}