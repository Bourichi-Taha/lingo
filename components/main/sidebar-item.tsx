'use client';

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface SidebarItemProps {
    label: string;
    icon: string;
    href: string;
}

const SidebarItem = (props: SidebarItemProps) => {
    const { href, icon, label } = props;
    const pathame = usePathname();
    const active = pathame === href;
    return (
        <Button variant={active ? "sidebarOutline" : "sidebar"} className="justify-start h-[52px]" asChild>
            <Link href={href}>
                <Image src={icon} alt={label} className="mr-5" height={32} width={32} />
                {label}
            </Link>
        </Button>
    )
}

export default SidebarItem