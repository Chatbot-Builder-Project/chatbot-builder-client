import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Button,
  Grid,
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import { IconPhoto, IconPhotoPlus } from "@tabler/icons-react";
import { theme } from "@chatbot-builder/client";
import { useLazyGetImagesQuery } from "@chatbot-builder/store/API/imageUploader/imageUploader";
import { useUploadComponent } from "@chatbot-builder/store/API/imageUploader/useUploadComponent";

interface ImageModalUploaderProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (imageUrl: string) => void;
}

interface ImageSelectorButtonProps {
  onImageSelect: (imageUrl: string) => void;
  buttonText?: string;
}

export const ImageSelectorButton: React.FC<ImageSelectorButtonProps> = ({
  onImageSelect,
  buttonText = "Select Image",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Button
        onClick={handleOpenModal}
        startIcon={<IconPhotoPlus size={20} />}
        variant="contained"
        sx={{
          backgroundColor: "#009bff",
          "&:hover": {
            backgroundColor: "#0081d5",
          },
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {buttonText}
      </Button>

      <ImageModalUploader
        open={isModalOpen}
        onClose={handleCloseModal}
        onSelect={onImageSelect}
      />
    </>
  );
};

const ImageModalUploader: React.FC<ImageModalUploaderProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const queryParams = {
    PageParams: {
      PageNumber: page,
      PageSize: pageSize,
    },
  };

  const [getImages, { data, isLoading }] = useLazyGetImagesQuery();

  useEffect(() => {
    if (open) {
      getImages(queryParams);
    }
  }, [open, page, getImages]);

  const { uploadAndGetImage, isLoading: isUploading } = useUploadComponent();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadAndGetImage({
        file,
        isProfilePicture: false,
      });
      if (result) {
        getImages(queryParams);
      }
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    onSelect?.(imageUrl);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxHeight: "80vh",
          bgcolor: theme.colors.background,
          border: `1px solid ${theme.colors.gray}`,
          borderRadius: 1,
          p: 4,
          overflow: "auto",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color={theme.colors.lightText}
            sx={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Image Gallery
          </Typography>
          <Button
            component="label"
            startIcon={<IconPhotoPlus size={20} />}
            variant="contained"
            sx={{
              backgroundColor: "#009bff",
              "&:hover": {
                backgroundColor: "#0081d5",
              },
              fontFamily: "Montserrat, sans-serif",
            }}
            disabled={isUploading}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress sx={{ color: "#009bff" }} />
          </Box>
        ) : data?.page?.items?.length === 0 || !data?.page?.items ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              color: theme.colors.lightText,
            }}
          >
            <IconPhoto
              size={48}
              style={{ marginBottom: "16px", color: "#009bff" }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "8px",
              }}
            >
              No Images Yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: theme.colors.lightText,
              }}
            >
              Upload your first image to get started
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {data?.page?.items?.map((image) => (
                <Grid item xs={3} key={image.id}>
                  <Box
                    sx={{
                      bgcolor: theme.colors.secondaryBackground,
                      p: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => handleImageSelect(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil((data?.page?.totalCount || 0) / pageSize)}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontFamily: "Montserrat, sans-serif",
                    color: theme.colors.lightText,
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#009bff !important",
                  },
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};
