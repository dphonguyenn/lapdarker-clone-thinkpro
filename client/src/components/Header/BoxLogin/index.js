import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Typography,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
} from "@mui/material";
import { GrClose } from "react-icons/gr";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import img_box_login from "../../../media/img/selections/12.jpg";
import cursor_error from "../../../media/img/cursor/cursor06.png";
import { styles } from "./styles.js";
import { postInfoLogin } from "../../../redux/actions";
import { stateRequestAuth } from "../../../redux/selectors";

function BoxLogin({ isShow, handleClose }) {
  const [textPhone, setTextPhone] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [checkAccountInput, setCheckAccountInput] = useState(false);
  const [checkPasswordInput, setCheckPasswordInput] = useState(false);
  const [messageWrongPass, setMessageWrongPass] = useState("");
  const dispatch = useDispatch();
  const state_request = useSelector(stateRequestAuth);
  useEffect(() => {
    console.log(state_request);
  }, [state_request]);

  const isPostedInfoAcc = state_request.length > 0 ? true : false;
  const hasExistAcc = state_request === "CREATE_PASSWORD" ? false : true;

  const isVietnamesePhoneNumber = (number) =>
    /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);

  const handleChangeTextPhone = useCallback(
    (event) => {
      setTextPhone(event.target.value);
      setCheckAccountInput(
        isVietnamesePhoneNumber(event.target.value) &&
          event.target.value.length > 9
      );
    },
    [setTextPhone, setCheckAccountInput]
  );

  const handleChangeTextPassword = useCallback(
    (event) => {
      setTextPassword(event.target.value);
      setCheckPasswordInput(event.target.value.length > 0);
    },
    [setTextPassword, setCheckPasswordInput]
  );

  const handleOnClickBtnReturn = useCallback(() => {
    dispatch(
      postInfoLogin.postInfoLoginAccountCancelled("CANCELLED_AUTHENTICATION")
    );
  }, [dispatch]);

  const handleSubmitInfoAccount = useCallback(() => {
    dispatch(postInfoLogin.postInfoLoginAccountRequest({ phone: textPhone }));
  }, [dispatch, textPhone]);

  const handleSubmitInfoPassword = useCallback(() => {
    dispatch(
      postInfoLogin.postInfoLoginPasswordRequest({
        phone: textPhone,
        password: textPassword,
        state_request: hasExistAcc
          ? "LAST_AUTHENTICATION"
          : "CREATE_NEW_ACCOUNT",
      })
    );
    if (state_request === "WRONG_PASSWORD") {
      setMessageWrongPass("M???t kh???u kh??ng ch??nh x??c");
    } else {
      handleClose();
      setMessageWrongPass("");
    }
  }, [
    dispatch,
    textPhone,
    textPassword,
    hasExistAcc,
    state_request,
    handleClose,
  ]);
  // ? box 1
  const boxInfoAcc = (
    <>
      <Typography sx={styles.text_body01}>LapDarkder xin ch??o!</Typography>
      <Typography sx={styles.text_body02}>
        H??y b???t ?????u v???i s??? ??i???n tho???i c???a b???n nh??
      </Typography>
      <FormControl variant="standard" sx={styles.input_form}>
        <InputLabel htmlFor="component-simple" sx={styles.input_label}>
          S??? ??i???n tho???i
        </InputLabel>
        <Input
          autoFocus
          required
          inputProps={{ inputMode: "numeric" }}
          value={textPhone}
          onChange={handleChangeTextPhone}
          sx={styles.input}
        />
        <FormHelperText
          sx={{
            color: "red",
            display:
              textPhone.length < 10 || checkAccountInput ? "none" : "initial",
          }}
        >
          S??? ??i???n tho???i c???a b???n kh??ng h???p l??? *
        </FormHelperText>
      </FormControl>
      <Button
        onClick={handleSubmitInfoAccount}
        disabled={!checkAccountInput}
        sx={Object.assign(
          {
            bgcolor: checkAccountInput ? "#fe3464" : "#ecf0f4",
            "&.Mui-disabled": {
              pointerEvents: "all",
              cursor: `url(${cursor_error}) ,auto`,
            },
            "&:hover": {
              bgcolor: checkAccountInput
                ? "rgba(210, 77, 87, 1)"
                : "rgba(218, 223, 225,1)",
            },
          },
          styles.btn_login
        )}
      >
        <Typography
          sx={Object.assign(
            { color: checkAccountInput ? "white" : "rgba(171, 183, 183, 1)" },
            styles.text_btn_login
          )}
        >
          Ti???p theo
        </Typography>
        <IoIosArrowForward
          style={Object.assign(
            { color: checkAccountInput ? "white" : "rgba(171, 183, 183, 1)" },
            styles.icon_btn
          )}
        />
      </Button>
      <Typography sx={styles.text_body03}>Ho???c</Typography>
      <div style={{ display: "flex" }}>
        <IconButton sx={styles.icon_btn_sn}>
          <BsFacebook
            style={{
              color: "rgba(3,138,255,1)",
              fontSize: "28px",
              padding: "2px",
            }}
          />
        </IconButton>
        <IconButton sx={styles.icon_btn_sn}>
          <FcGoogle style={{ fontSize: "28px", padding: "2px" }} />
        </IconButton>
      </div>
    </>
  );

  // ? box 2
  const boxInfoPassword = (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={styles.text_body01}>
          {hasExistAcc ? "Ch??o m???ng tr??? l???i," : "C??n m???t b?????c n???a th??i, "}
        </Typography>
        <Typography sx={styles.text_body02}>
          {hasExistAcc
            ? "H??y nh???p m???t kh???u cho t??i kho???n c???a b???n"
            : `H??y t???o m???t kh???u cho s??? ??i???n tho???i ${textPhone}`}
        </Typography>
        <FormControl variant="standard" sx={styles.input_form}>
          <InputLabel htmlFor="component-simple" sx={styles.input_label}>
            M???t kh???u
          </InputLabel>
          <Input
            autoFocus
            required
            value={textPassword}
            onChange={handleChangeTextPassword}
            sx={styles.input}
          />
          {messageWrongPass.length > 0 && (
            <FormHelperText sx={{ color: "red" }}>
              {messageWrongPass}
            </FormHelperText>
          )}
          {/* <FormHelperText sx={{ color: 'red', display: state_request === 'WRONG_PASSWORD' ? 'initial' : 'none'}}>M???t kh???u c???a b???n kh??ng h???p l??? *</FormHelperText> */}
        </FormControl>
        <Button
          onClick={handleSubmitInfoPassword}
          disabled={!checkPasswordInput}
          sx={Object.assign(
            {
              bgcolor: checkPasswordInput ? "#fe3464" : "#ecf0f4",
              "&.Mui-disabled": {
                pointerEvents: "all",
                cursor: `url(${cursor_error}) ,auto`,
              },
              "&:hover": {
                bgcolor: checkPasswordInput
                  ? "rgba(210, 77, 87, 1)"
                  : "rgba(218, 223, 225,1)",
              },
            },
            styles.btn_login
          )}
        >
          <Typography
            sx={Object.assign(
              {
                color: checkPasswordInput ? "white" : "rgba(171, 183, 183, 1)",
              },
              styles.text_btn_login
            )}
          >
            Ti???p theo
          </Typography>
          <IoIosArrowForward
            style={Object.assign(
              {
                color: checkPasswordInput ? "white" : "rgba(171, 183, 183, 1)",
              },
              styles.icon_btn
            )}
          />
        </Button>
        <div style={{ cursor: "pointer", marginTop: "12px" }}>
          <Typography sx={styles.text_forgot_pass}>Qu??n m???t kh???u</Typography>
        </div>
      </div>
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        onClick={handleOnClickBtnReturn}
      >
        <IoIosArrowBack style={{ fontSize: "18px", fontWeight: "bold" }} />
        <Typography style={{ fontSize: "15px" }}>Quay l???i</Typography>
      </div>
    </>
  );

  return (
    <div>
      <Modal open={isShow} onClose={handleClose}>
        <Paper sx={styles.box}>
          <div style={styles.side_box}>
            <div style={styles.wrap_side_box}>
              <div style={styles.side_box_header}>
                <Typography sx={{ fontSize: "25px" }}>
                  ????ng k?? / ????ng nh???p
                </Typography>
                <IconButton onClick={handleClose}>
                  <GrClose />
                </IconButton>
              </div>
              <div style={styles.side_box_body}>
                {isPostedInfoAcc ? boxInfoPassword : boxInfoAcc}
              </div>
            </div>
          </div>
          <div style={styles.side_box}>
            <img style={styles.img} src={img_box_login} alt="img login" />
          </div>
        </Paper>
      </Modal>
    </div>
  );
}

export default BoxLogin;
