import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space, Menu, GetProp, MenuProps } from "antd";
import Cookies from "js-cookie";

type Props = {
    children: JSX.Element;
};

const NavbarTab: React.FC<Props> = ({ children }) => {
    return (
        <>
            <div className="flex items-center">
                <div className="flex justify-center items-center rounded-md h-12 w-40 cursor-pointer">
                    {children}
                </div>
            </div>
        </>
    );
};

type MenuItem = GetProp<MenuProps, "items">[number];

export const Navbar: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    function handleClick() {
        setMenuVisible(!menuVisible);
    }

    const items: MenuItem[] = [
        {
            key: "",
            label: "",
            icon: (
                <Avatar
                    size="large"
                    icon={<UserOutlined />}
                    // onClick={handleClick}
                />
            ),
            children: [
                { key: "", label: "Profile" },
                {
                    key: "",
                    label: "SignOut",
                    onClick: () => {
                        Cookies.remove("authToken");
                        window.open("/", "_self");
                    },
                },
            ],
        },
    ];

    return (
        <>
            <div className="flex mt-20 ml-10 mr-10 px-10 py-8 justify-between rounded-md">
                <div className="flex justify-between w-1/2">
                    <Button
                        size="large"
                        color="primary"
                        variant="filled"
                        className="ml-20"
                    >
                        <Link to="/">Home</Link>
                    </Button>
                    <Button size="large" color="primary" variant="filled">
                        <Link to="/problems">Problems</Link>
                    </Button>
                    <Button
                        size="large"
                        color="primary"
                        variant="filled"
                        className="mr-10"
                        onClick={() => {
                            setMenuVisible((menuVisible) => !menuVisible);
                        }}
                    >
                        {/* <Link to="/contest">Contest</Link> */}
                        Contest
                    </Button>
                </div>
                <div>
                    <Menu theme="light" mode="horizontal" items={items} />
                </div>
                {menuVisible && (
                    <div className="top-[170px] left-[610px] absolute z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg shadow-sm focus:outline-none">
                        <div className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                            <Link to="/contest/create-room">
                                Create Contest
                            </Link>
                        </div>
                        <div className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                            <Link to="/contest/join-room">Join Contest</Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
