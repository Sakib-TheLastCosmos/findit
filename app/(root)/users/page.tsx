import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import UsersList from "@/components/UsersList";
import { getBaseURL } from "@/lib/utils";


export default async function Users ({searchParams} : any) {
    const query = (await searchParams).query|| "";
    const baseUrl = await getBaseURL()

    const usersResponse = await fetch(`${baseUrl}/api/profile/list?query=${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })

    const users = (await usersResponse.json()).users

    console.log(users)

    return (
        <div>
            <SearchBar query={query} placeholder="Search for someone..."/>

            <UsersList users={users} />
        </div>
    )
}