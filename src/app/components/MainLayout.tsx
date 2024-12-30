
interface MainLayoutProps {
    className?: string;
    children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <div className={` gap-4 p-8 pt-0 ${props.className}`}>
            {props.children}
        </div>
    )
}

export default MainLayout