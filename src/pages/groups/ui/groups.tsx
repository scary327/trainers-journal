import { Loader, PageTitle } from "@/shared/ui";
import * as styles from "./groups.module.css";
import { GroupsWidget } from "@/widgets";
import { getGroups } from "@/entities/api/services/";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect, useState } from "react";

export const Groups = () => {
    const title = "Группы";
    const groups = useSelector((state: RootState) => state.groups.groups);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const userName = useSelector((state: RootState) => state.user.user.userName);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            dispatch(getGroups(userName));
            setLoading(false);
        };

        fetchGroups();
    }, [dispatch]);

    return (
        <div>
            <PageTitle title={title} />
            <div className={styles.main_container}>
                {loading ? <Loader /> : <GroupsWidget groupList={groups} />}
            </div>
        </div>
    );
};
