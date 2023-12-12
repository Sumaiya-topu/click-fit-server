exports.imageUpload = async (req, res) => {
  try {
    res.json({
      status: "success",
      url: `${process.env.multer_url}/${req.file.filename}`,
    });
  } catch (err) {}
};
