import { useLocation } from &rsquo;react-router-dom&rsquo;;
import { useLayoutEffect } from &rsquo;react&rsquo;;

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: &rsquo;instant&rsquo; });
    }, [pathname]);

    return null;
}

export default ScrollToTop;