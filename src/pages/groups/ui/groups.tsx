import { Loader, PageTitle } from "@/shared/ui";
import * as styles from "./groups.module.css";
import { GroupsWidget } from "@/widgets";
import { getGroups } from "@/entities/api/services/";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";

export const Groups = () => {
    const title = "Группы";
    const groups = useSelector((state: RootState) => state.groups.groups);
    const loading = useSelector((state: RootState) => state.groups.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    const userName = useSelector((state: RootState) => state.user.user.userName);

    useEffect(() => {
        const fetchGroups = async () => {
            dispatch(getGroups(userName));
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
