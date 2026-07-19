import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Pages listed here must never render the GHL chat widget alongside a
// phone-collecting form, or A2P 10DLC compliance review will flag it
// as a multiple-opt-in violation. This runs on every route change,
// including client-side SPA navigation (not just hard page loads),
// because the widget div persists across route changes otherwise.
const HIDDEN_ROUTES = ['/quote'];

let storedNode = null;
let storedParent = null;
let storedNextSibling = null;

export default function ChatWidgetGate() {
  const location = useLocation();

  useEffect(() => {
    const shouldHide = HIDDEN_ROUTES.includes(location.pathname);
    const widget = document.querySelector('[data-widget-id]');

    if (shouldHide) {
      if (widget) {
        storedNode = widget;
        storedParent = widget.parentNode;
        storedNextSibling = widget.nextSibling;
        widget.remove();
      }
    } else if (storedNode) {
      if (storedParent && !storedParent.contains(storedNode)) {
        storedParent.insertBefore(storedNode, storedNextSibling);
      }
      storedNode = null;
      storedParent = null;
      storedNextSibling = null;
    }
  }, [location.pathname]);

  return null;
}
