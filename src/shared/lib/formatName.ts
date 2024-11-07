export const formatUserName = (fullName: string) => {
    const [surname, name] = fullName.split(" ");
    const nameInitial = name ? `${name[0]}.` : "";
    return `${surname} ${nameInitial}`;
};
