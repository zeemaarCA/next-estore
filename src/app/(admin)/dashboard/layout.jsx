import Sidebar from "@components/admin/Sidebar";

const DashboardLayout = ({ children }) => {
	return (
		<div className="">
			<Sidebar />
			<main className="p-4 sm:ml-64">
				<div className="min-h-screen">{children}</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
