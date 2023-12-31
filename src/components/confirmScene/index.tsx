import { use, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import SceneHeader from '../sceneHeader';

import AddressBox from './addressBox';
import VerificationButton from './verificationButton';
import { Heading, Label, Numbers, SceneLayout, SubHeading } from '~/layout';
import { isVoiceVerifiedAtom, numberOfSendItemTestAtom, pageStepAtom, sendAmountAtom, toAddressAtom } from '~/state';
import { PAGE_STEPS } from '~/state/types';
import { useAccount, useSignMessage } from 'wagmi';
import { delay } from '~/hooks/delay';

const ConfirmScene = () => {
  const {address} = useAccount();
  const setPageStep = useSetAtom(pageStepAtom);
  const toAddress = useAtomValue(toAddressAtom);
  const sendAmount = useAtomValue(sendAmountAtom);
  const isVoiceVerified = useAtomValue(isVoiceVerifiedAtom);

  const [isLoading, setIsLoading] = useState(false);


  const { data, isError, isSuccess, signMessage } = useSignMessage({
    message: `{
      "proof": "0x2df7249104b86a6f803ea64dd914dcbd0989972523d6ba11af9024ca955bb1871fdefbc76e7c8e7cf7951fe62814046253f3d12ea322f05500e66d410cc8c30602e6deb58faa4f3798df1300a724524fbb1f9eb5edbb0764ab8f19e3fa2016a916f367d2e704d832184047077ea7da311c2483bbe87d7ae2cbe73c19af7327392752d69932ed0ff27d1bb128f129ce3c43e00e194c9b6c47df29aae539717323224867227b15d94f9f953663d2d078a9ab07dbe7d22bba1c28b4506a5a4e4d911532817b9ecee8ed7ac87487e56c067a9bce6f68558f46d166e4b679576badf7244f8f94f4b38fcf54d4e96f081d8461fe01ece8d924ee79cd0ebfc96532861c24029fcaa7d4fa60052558a3317104245610dd1000c415c2916e2e5762fb134719feb08def5081a9c8ffe07f612ee3f66a78a33db634b4f9258c199c3f3849710734b879b166679d500d7c8cef41ac17b95e0afe8e8f2bccb375f07e53d3349b14993335cb1ccd8db1dc1ecb94c3cc244b891bdca4c1aa2183f8c389739422d30f7be2f32b42c613d6f567bdb93bc0281afc5fc52f337538d962b2c8125b5e55014f90a6bd258e035fc06118ff55a909ba2868946614dade0d785f7297488dbd2b72a4f65d4ba2ac7c10b6e5563c85bcc9df2068089159501ac112639d867ed21bd695b090e5e9d5963521c73af531073cd2f982619e06db4ad5836439e99bcc205aa91a0cdb244bf67d58c3e031c969492b114c18a9b9c596d086cdd5562dd42c0b0a1eb4dc9af32c694a6754674cab6598f041fcb97bd2066522429c6df1aa2fe37c5143105a88ab2217e58d4ba95fc7e499664dc5f15fd4fca42c87eea1510d1f4c3f550e104a00a9b912e9c1664fc08561d283f06744161e14e2fd3f2635272ce40f6270854d789ef4dfaa975c78551623b248f0a0026cf8634d11b31af91c3b24c2f20d820b3d05f49967173c95a6403220cb97997f2314983a815efe5f1d33fb4593548ad1aff309444ee485b4ca01dd29f1d71eb667968c3d8a5b55782dac7446d2f4beb369022a41b64adf2feb371c3feb3e20a7364d649d5783463315ac8bce0e8222cf6f6d23eea5dbafd2044cf625c0c68fcc07aa79be64db49b707571984ef7e99e029281328ea8573fa4e5a72cd0923f1c61a8476d24f2cf276103970cdced61636d237c810f9d64937cb6971eb29761297f1bff74bf40b738118a189dc89543f8c75b90c97076813dbee2cd9738d57f31ff889e55d7eb3fc0b1bcc9d1d625d97ebcfbbbe3e2dae6029e8ea48a0bf5867f5f940f9548906caa913b253966b6fbaa953a3e75d3c26ce9d0515943edd382c48770f35b5b2e110de2449dc33233cf1701434db55ff6175fc9caabcf5d7886124de019a6c45ef03130a38dd08f13aecce37e158d67af33e6436e144d60d9af125213ae1bdfdf24567000a2357544770eb22bd477e391a20dbfa4743a86cf2568d65ba3c5c93912ace1d5ab48b656d19f93bb01beeb492314c7ca06f30f554a07fc1f0bd8605ad07690a73720c60f953008cde60f7d7fe8db821a0812719ab7b768f91b782cbd5383c2e3ecc875b542754e90c71647ba3eba582672bdacbfbd25c1435f37090a0766a056fd5910bcf0d0c1f2d8847bfb6adb4bd1c7a16cf8d0d31c00d8b223943e8bb3019f3ba6283fd9f98987d6651e7fab1f311b03d5898d29b6ed21dbc686dbccb1dd3277bfdb7ef253e58782be83154ce0f2efbbe3a2d9ce0c91468e51878d3c11c74e9c3316748f230cb74a2749e4330c7b1d21a218517d4a3816b47f5db3fba2d3670946bd8288e6db79a486b36d2e88ef3588395d1532146eb4dde2396f1f918bef3ad7277e54cdcff96524569e1a1071d830401803ab1ccbdc818c56b59ef2e17da24b04aabba54144650236e08ec885f718e8e2148ad512b509b69fbedfe1cdd8e32565fc1072ff160357f540b30a8daf8055e51facf717ce0169d389fa81b83627687803beb7c5be9947b52817daeb9ecb27033d99415f8078c4b64a2c50a003ad613cb2e4c6cfdebc757261e92f0701c1795a88860ff40a174e1238c55191071451ba3528889d540e4ca6d693c586364ee7dea35dea513f7f6bb44ba1b278dd9d489f2296c9bb32e0c0804a2a6edfc023b8f5d608123ef1d294239cbc712142974e3fb2dae073828b22e6ab5d0276032573ae0715297adb503e9d9fee0192939615c587aee5c52eded4f54f0babfa0635ea1e0acc9e0301853be9314dc1658e31356ff005fe8ce4ed96aa11df41bc2d685ab61e29ec1fb1fd7bc298c10092794e99dd27bb04addb2d73db99cef86fa1e23b30c5cc6e0df6902201142e7166bb3c8c9ffa0771898d39ebd9bb3f6a77aabffb189cac9af9fcc6da5cb57750399ca3de8a72c47870860f8c1df0accdcec8abf221ea3c92238273523041c9529969a5310dba388e67acc5d181c2ec760dd2f5fffa1eab17c1542d6838851cc09bc698bb07f87965d259d1371ee5dad25dadc3b31927529106ba455606ed3b2236eaec628c15f06db5c37846de150b7f775fba96ecd60ccce1510f2a48a6e86033c7ccab478a985e24ecfaf137b8b37083c80037412337582a2b780cb595cbd2fb426bf992a2909dccebfd9e74f2f09f4f3d274c39651e17738f4526c516d9210613988d4ff97561df260fe89cb4e5e7d0ddd3f9dcdcd38bbbb0b9a122ddb1206beb4d77325afedd6d68f489f405f64e358ac5354b293f13a2569a7d7a5d480134e4f4d9f72ac1456517dfedd25dad0c9ecf3f3b0a2e6783b65487ced19582200a58e2f104e1671ac92570aed948e41d9f325b35905472d59865777c504c4c32973b0beb4846837b3239f9b60526264580cc5a6901140c4eaf2bb651d45e1cc006e2695ca7a80deabee630be88f9b1ac653e95c507178d26303483a8a4f02be2df7bb276baae0f0e425a3b63d4bd263f492bf7ff2102d4df91082d2aefd323809c6beecc6565dc67128e8436c162d154aabfd886038fa11be8cf95b488d5f7e0bf575e6665e934c1dc8a118085ffb70de9d91ca61290a583d80757600253fc92b839f50587e81620aa1ca884f072085ebf5d5b12dfe25434a87172c53ed1399000000000000000000000000000000000000000000000000000000000000000008fa4e8089dc94267aee587b5b8dbcc67a229b192105d1e98f2ab5e614174d29118c3c333db58cf380cee82f155a76c2134755f514a0a64ba6cc7b091309206129788db2448312c3a08fef96aec839644e63e2c3fc3069cbf26b533387c92d9614bdcfccf4695ab37e84d007f5300d8c48a661c18bb13da7cd971d01692da46e1b4d3adb25593cb79d3b5664f5b7dd68975bd7a57f50c79430bb25f2dad1259b28ee565718f7d7f6e98323af3dbc6417b5f6016151c756825b344d6f6cdf4f2021eb1e55c92ee8e844795ab2bd65f1e75c910d2e61fcd029ff3386a7961a4e422084f1addde57da6ac93842693852608c8abb43bf9d076468caff8252911e90f223198e9e82f90f223c0cca56bb3562e3a5bf74db5f3d0eee9451088e7519304004b55a6b39dc27224f575fa273a76f08adb2e204e2430f578dc3467bf706bbb15939b20e3c6d83ab7c30ceda881e93e3d313cc86d3a676a97508dcc1fdbe26217116af6e2b0afdbfd0d9bf7ddc5ae7bed5e437943a5ea768dcc9aea5ad3c57a1ff43ffb833194b711ef2a2671ef7f5faa6695d1335167235553abe3af14871613bdcd7b5310af49cc2a6337018427a911fdf107168bb37e14601969deb953421ea597ebf6f5267e6e4ba1cc24f51cee2df4a7a6dc54a76289cfd5fd59e2cf2d03be0028a6097c224090deec7e07574b1dc246087a0751d32a77aaaeb4fc6a0825d2e00828737e9e03f0e4175c2b43f0938f2e991f23bb73e3661edf7ade20dd154cc9bf166bb5d5ba070bfd51dead405317deac7b423f800fa6e521cef0a4ed0e83facda45ec0215e018ba8f681dbb320d856b950357bc303b2f359df7e720022b16f324ec4bd493328f7b059ced01e61205316b4053587205318548fb9d4cd25e973e34a75308406758b256b9a8018a975c0168edcd86681cca17a03643361193589b74b5dff987acb80aeb5c3e7462dcf20bf351bf45f514bdf25b2a5b2051fbd1cd78ef6b001bcbc189c80c9b99297f5c54f33798da412b6faee592dc0c9271fc42039a79850695a6109d0131437dceb1d7b999f42bbc0fad8392078a0d60f4a083a23af005779860c392a9bc71a7188fd6a7629d062b506fdc8583ddfc31f88930f8e68cbb20b38cfe2a3e981207843f22df543aec47c4d82e72df51be20dba5e1cbed8547b996db39f26b5a782b83ad3f6f72ed4bb8ee27785003ca8871a368db80006d08fbb9b6c058b7c6c301d9653f637d8cd8304d401fa0adec4f41a18aefc7fd8f88bcc18db5ebbf60e52bdf25ca2d1672aa714338777b4734cce00c8bfbb4498e7a484eed3995292dc4d767f0c938ac9266966006ec1455259311e3011bbdc811be91f12874adaa77c6401e3b902553811c3dc268ab522dba8902ae71a3394290c8ad28a6ac91425ccca24692ff848c1a44363eaaf3ec59fe24125477f623132fc5641002e587a42d4103deb946d33a0d48414c354cb8ac210a001f82715bbbf4d0b727fbd56e287eec03aeebd191085cc6d57067d79ee3630af1fc14072eb0f81c37d1c38cbaa45856315f69e13337c3b81735261e78d06363722c1f540823c8235bd81ef07256f2f0248f5f3271cc3ee5bb2e8716892aaf2921d4c7978a35708a86f3ece05f11479f18f244743947e17fc6c36db96203d2c5b0ed0fa765fa060db81128fc40e65cc7f6cd6183247b7926ba458b298c1baa3c823ddde4ab50d27bd94b1ff3463a7ac7256aafe7a854d85b9e37be303fbce86101f3fd8ace4a0525f00083bf3c32fa18b0866095dee05049a896a3ff9544403351ccee40b6f78c337be6844e98319c4369c388bcfea39e1c3765139a9e71dae472434c4df7fc904e3540a57e3066b0c3ddfad5ddb7d0dd6a093238e898738ed81291a1e094e7dcc64292e742445b6e4c787cf59ce1c1ccc3109baaa443d44e50c2352eb1e11ece7d21036b1dbd5705a186ddf42bc5ad43496f4331be9b866249c"
    }`,
  })

  
  const [numberOfSendItemTest, setNumberOfSendItemTest] = useAtom(
    numberOfSendItemTestAtom,
  );

  const handleClickVoiceVerification = () => {
    setPageStep(PAGE_STEPS.voiceVerification);
  };

  const handleClickBack = () => {
    setPageStep(PAGE_STEPS.send);
  };
  const handleClickConfirmation = () => {
    signMessage();
  };

  const handleClickSend = async () => {
    setIsLoading(true);
    setNumberOfSendItemTest(numberOfSendItemTest + 1);
    await delay(3000);
    setPageStep(PAGE_STEPS.main);

  };

  return (
    <SceneLayout
      sx={{
        position: 'relative',
      }}
    >
      <SceneHeader title="You are sending" backTo={PAGE_STEPS.send} />

      <SubHeading>Abstract</SubHeading>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'flex-end',
          mt: 4,
          gap: '16px',
        }}
      >
        <AddressBox label="From" address={address || `0x123`} />
        <AddressBox label="To" address={toAddress || '0x123'} />
      </Box>

      <Box sx={{ mt: 8 }}>
        <Label>Amount</Label>
        <Numbers>{sendAmount} YAHO</Numbers>
      </Box>

      <Divider sx={{ mx: 0, my: '24px', background: '#4465DA' }} />

      <Box>
        <Box>
          <Heading>Additional steps needed</Heading>
          <Typography variant="caption">
            In case of transaction over 1,000 YAHO, Voice Verification is needed
          </Typography>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <VerificationButton
            label="Voice verification"
            onClick={handleClickVoiceVerification}
            isVerified={isVoiceVerified}
          />
          <VerificationButton
            label="Conformation"
            onClick={handleClickConfirmation}
            isVerified={isSuccess}
          />
        </Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, position: 'absolute', bottom: 0 }}
        disabled={isVoiceVerified === false || isSuccess === false || isLoading}
        onClick={handleClickSend}
      >
        Send
        {isLoading && <CircularProgress size={12} sx={{ ml: 2 }} />}
      </Button>
    </SceneLayout>
  );
};

export default ConfirmScene;
