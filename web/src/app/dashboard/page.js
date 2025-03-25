import Navbar from "@/app/components/Navbar";

export default function Dashboard() {
    return (
        <>
           <Navbar />
            <div className="flex flex-col gap-4 p-12">
                <h1 className="text-3xl">Guilds</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 1</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span> {/* Add an "are you sure prompt" */}
                    </div>
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 2</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 3</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 4</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 5</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span>
                    </div>
                    <div className="p-4 bg-gray-900 rounded-md">
                        <h2 className="text-lg font-medium">Server 6</h2>
                        <p>ID: 23893249843983489 - Members: 30</p>
                        <span>Leave</span>
                    </div>
                </div>
            </div>
        </>
    );
}
