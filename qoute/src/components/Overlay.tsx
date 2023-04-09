import { ClientOnlyPortal } from "./ClientOnlyPortal";
import { DismissButton } from "./DismissButton";

export interface OverlayProps {
  onDismiss: () => void;
  children: JSX.Element;
}
export const Overlay: React.FunctionComponent<OverlayProps> = (props) => {
  const { children, onDismiss } = props;
  return (
    <ClientOnlyPortal selector="#modal">
      <div className="backdrop">
        <div className="modal">
          <div className="dismiss">
            <DismissButton onClick={onDismiss} />
          </div>
          {children}
        </div>
        <style jsx>{OVERLAY_STYLE}</style>
      </div>
    </ClientOnlyPortal>
  );
};

const OVERLAY_STYLE = `
              :global(body) {
                overflow: hidden;
              }
              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.6);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }
              .modal {
                display: grid;
                background-color: white;
                border-radius: 12px;
                position: absolute;
                width: fit-content;
                height: fit-content;
                margin: auto;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 20px;
              }
             .dismiss{
                margin-left: auto;
                background: none;
                border: none;
                cursor: pointer
             }

            `;
