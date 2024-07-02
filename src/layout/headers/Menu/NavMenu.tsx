"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menu_data from "../../../data/MenuData";

const NavMenu = () => {
    const currentRoute = usePathname();
    const [activeMenuItem, setActiveMenuItem] = useState(currentRoute);

    useEffect(() => {
        setActiveMenuItem(currentRoute);
    }, [currentRoute]);

    const handleMenuItemClick = (menuLink: string) => {
        setActiveMenuItem(menuLink);
    };

    const isMenuItemActive = (menuLink: string) => {
        return activeMenuItem === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return activeMenuItem === subMenuLink;
    };

    const handleScroll = () => {
        const sections = document.querySelectorAll("section");
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 2) {
                currentSectionId = section.getAttribute("id") || "";
            }
        });

        if (currentSectionId) {
            const activeMenu = menu_data.find((menu) => menu.link === `/#${currentSectionId}`);
            if (activeMenu) {
                setActiveMenuItem(activeMenu.link);
            } else {
                menu_data.forEach((menu) => {
                    if (menu.sub_menus) {
                        const activeSubMenu = menu.sub_menus.find(
                            (subMenu) => subMenu.link === `/#${currentSectionId}`
                        );
                        if (activeSubMenu) {
                            setActiveMenuItem(activeSubMenu.link);
                        }
                    }
                });
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <ul className="navigation">
            {menu_data.map((menu) => (
                <li
                    key={menu.id}
                    className={menu.has_dropdown ? "menu-item-has-children" : ""}
                >
                    <Link
                        href={menu.link}
                        className={`section-link ${
                            isMenuItemActive(menu.link) ? "active" : ""
                        }`}
                        onClick={() => handleMenuItemClick(menu.link)}
                    >
                        {menu.title}
                    </Link>

                    {menu.has_dropdown && (
                        <ul className="sub-menu">
                            {menu.sub_menus?.map((sub_m, i) => (
                                <li key={i}>
                                    <Link
                                        href={sub_m.link}
                                        className={isSubMenuItemActive(sub_m.link) ? "active" : ""}
                                        onClick={() => handleMenuItemClick(sub_m.link)}
                                    >
                                        {sub_m.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
