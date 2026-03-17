import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import DashboardLayout from "./components/layout/DashboardLayout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import OpportunityExplorer from "./pages/OpportunityExplorer";
import Community from "./pages/Community";
import Events from "./pages/Events";
import TrainingHub from "./pages/TrainingHub";
import DonationPage from "./pages/DonationPage";
import UserProfile from "./pages/UserProfile";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
    {
        // Landing page has its own Navbar + Footer
        path: "/",
        Component: LandingPage,
    },
    {
        // Auth pages with Navbar (no Footer)
        Component: MainLayout,
        children: [
            { path: "/signin", Component: Login },
            { path: "/signup", Component: Register },
        ],
    },
    {
        // Authenticated pages with Sidebar + Navbar
        Component: DashboardLayout,
        children: [
            { path: "/volunteer/dashboard", Component: VolunteerDashboard },
            { path: "/organization/dashboard", Component: OrganizationDashboard },
            { path: "/opportunities", Component: OpportunityExplorer },
            { path: "/community", Component: Community },
            { path: "/events", Component: Events },
            { path: "/training", Component: TrainingHub },
            { path: "/donations", Component: DonationPage },
            { path: "/profile", Component: UserProfile },
            { path: "/profile/:userId", Component: UserProfile },
            { path: "/settings", Component: Settings },
        ],
    },
]);

