import { Dialog, DialogTitle } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const ShareDialog = ({ onClose, open, id, notify }) => {
  const handleClose = () => {
    onClose(true);
  };
  const idVideo = "https://youtube.com/watch?v=" + id;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(idVideo);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Share</DialogTitle>
      <div className="px-8 pb-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <FacebookShareButton
            url={`https://youtube.com/watch?v=${id}`}
            title={`https://youtube.com/watch?v=${id}`}
          >
            <FacebookIcon className="w-14 h-14 rounded-full"></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton
            url={`https://youtube.com/watch?v=${id}`}
            title="http://localhost:3000/video/ArmDp-zijuc"
          >
            <TwitterIcon className="w-14 h-14 rounded-full"></TwitterIcon>
          </TwitterShareButton>
          <EmailShareButton
            url={`https://youtube.com/watch?v=${id}`}
            title={`https://youtube.com/watch?v=${id}`}
          >
            <EmailIcon className="w-14 h-14 rounded-full"></EmailIcon>
          </EmailShareButton>
          <WhatsappShareButton
            url={`https://youtube.com/watch?v=${id}`}
            title="http://localhost:3000/video/ArmDp-zijuc"
          >
            <WhatsappIcon className="w-14 h-14 rounded-full"></WhatsappIcon>
          </WhatsappShareButton>{" "}
          <LinkedinShareButton
            url={`https://youtube.com/watch?v=${id}`}
            title="http://localhost:3000/video/ArmDp-zijuc"
          >
            <LinkedinIcon className="w-14 h-14 rounded-full"></LinkedinIcon>
          </LinkedinShareButton>
        </div>
        <div className="flex items-center gap-2 justify-between border border-[#ccc] pl-2 py-1 pr-1 rounded-lg">
          <input
            type="text"
            className="flex-1 outline-none"
            value={idVideo}
            readOnly
          />
          <button
            className="bg-[#065fd4] text-white px-4 py-2 rounded-[18px]"
            onClick={() => {
              copyToClipboard();
              notify();
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ShareDialog;
