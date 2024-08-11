import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Card,
  Divider,
  Textarea,
  Input,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

const ThreadDetails = ({ thread, onBack }) => {
  const [comments, setComments] = useState(thread.comments || []);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  // Define colors outside of callbacks
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const commentBgColor = useColorModeValue('gray.100', 'gray.700');
  const replyBgColor = useColorModeValue('gray.50', 'gray.800');

  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (username && newComment) {
      const comment = {
        author: username,
        content: newComment,
        date: new Date().toLocaleString(),
        replies: [],
        likes: 0,
        dislikes: 0,
      };
      setComments([...comments, comment]);
      setNewComment('');
      setUsername('');
    }
  };

  // Function to handle adding a reply to a comment
  const handleAddReply = (commentIndex) => {
    if (username && newReply) {
      const updatedComments = [...comments];
      const reply = {
        author: username,
        content: newReply,
        date: new Date().toLocaleString(),
        likes: 0,
        dislikes: 0,
      };
      updatedComments[commentIndex].replies.push(reply);
      setComments(updatedComments);
      setReplyingTo(null);
      setNewReply('');
    }
  };

  // Function to handle editing a comment
  const handleEditComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].content = editedContent;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditedContent('');
  };

  // Function to handle editing a reply
  const handleEditReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].content = editedContent;
    setComments(updatedComments);
    setEditingReplyIndex(null);
    setEditedContent('');
  };

  // Function to handle deleting a comment
  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  // Function to handle deleting a reply
  const handleDeleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies = updatedComments[commentIndex].replies.filter((_, i) => i !== replyIndex);
    setComments(updatedComments);
  };

  // Function to handle liking a comment
  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1;
    setComments(updatedComments);
  };

  // Function to handle disliking a comment
  const handleDislikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].dislikes += 1;
    setComments(updatedComments);
  };

  // Function to handle liking a reply
  const handleLikeReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].likes += 1;
    setComments(updatedComments);
  };

  // Function to handle disliking a reply
  const handleDislikeReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies[replyIndex].dislikes += 1;
    setComments(updatedComments);
  };

  return (
    <VStack spacing={6} align="stretch" w="100%">
      <Card
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        width="1565px"
        >
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            {thread.title}
          </Text>
          <Divider />
          <HStack justifyContent="space-between">
            <Text fontSize="sm" color="gray.500">
              Date: {thread.date} at {thread.time}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Author: {thread.author}
            </Text>
          </HStack>
          <HStack justifyContent="space-between" mt={2}>
            <Text fontSize="sm" color="gray.500">
              Views: {thread.views || 'N/A'}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Tags: {thread.tags ? thread.tags.join(', ') : 'No tags'}
            </Text>
          </HStack>
          <Text fontSize="md" color={textColor} mt={4}>
            Replies: {thread.replies}
          </Text>
          <Divider />
          <Text fontSize="md" color={textColor} mt={4}>
            {thread.preview}
          </Text>

          <Divider mt={6} />

          {/* Comment Section */}
          <VStack spacing={4} align="stretch" mt={4}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Comments
            </Text>
            {comments.map((comment, index) => (
              <Box
                key={index}
                p={4}
                bg={commentBgColor}
                borderRadius="md"
                mb={2}
              >
                <HStack justifyContent="space-between">
                  <Text fontWeight="bold">{comment.author}</Text>
                  <HStack spacing={2}>
                    <IconButton
                      size="sm"
                      icon={<ArrowUpIcon />}
                      onClick={() => handleLikeComment(index)}
                    />
                    <Text>{comment.likes}</Text>
                    <IconButton
                      size="sm"
                      icon={<ArrowDownIcon />}
                      onClick={() => handleDislikeComment(index)}
                    />
                    <Text>{comment.dislikes}</Text>
                    <IconButton
                      size="sm"
                      icon={<EditIcon />}
                      onClick={() => setEditingCommentIndex(index)}
                    />
                    <IconButton
                      size="sm"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteComment(index)}
                    />
                  </HStack>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  {comment.date}
                </Text>

                {editingCommentIndex === index ? (
                  <VStack spacing={3} mt={3} align="stretch">
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <HStack>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleEditComment(index)}
                      >
                        Save
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setEditingCommentIndex(null)}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <Text mt={2}>{comment.content}</Text>
                )}

                {/* Replies Section */}
                {comment.replies && comment.replies.length > 0 && (
                  <VStack spacing={2} mt={4} pl={4} align="stretch">
                    {comment.replies.map((reply, replyIndex) => (
                      <Box
                        key={replyIndex}
                        p={3}
                        bg={replyBgColor}
                        borderRadius="md"
                        mb={2}
                      >
                        <HStack justifyContent="space-between">
                          <Text fontWeight="bold">{reply.author}</Text>
                          <HStack spacing={2}>
                            <IconButton
                              size="sm"
                              icon={<ArrowUpIcon />}
                              onClick={() => handleLikeReply(index, replyIndex)}
                            />
                            <Text>{reply.likes}</Text>
                            <IconButton
                              size="sm"
                              icon={<ArrowDownIcon />}
                              onClick={() => handleDislikeReply(index, replyIndex)}
                            />
                            <Text>{reply.dislikes}</Text>
                            <IconButton
                              size="sm"
                              icon={<EditIcon />}
                              onClick={() => {
                                setEditingReplyIndex(replyIndex);
                                setReplyingTo(null);
                                setEditedContent(reply.content);
                              }}
                            />
                            <IconButton
                              size="sm"
                              icon={<DeleteIcon />}
                              onClick={() => handleDeleteReply(index, replyIndex)}
                            />
                          </HStack>
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                          {reply.date}
                        </Text>

                        {editingReplyIndex === replyIndex ? (
                          <VStack spacing={3} mt={3} align="stretch">
                            <Textarea
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                            />
                            <HStack>
                              <Button
                                colorScheme="blue"
                                onClick={() => handleEditReply(index, replyIndex)}
                              >
                                Save
                              </Button>
                              <Button
                                colorScheme="red"
                                variant="outline"
                                onClick={() => setEditingReplyIndex(null)}
                              >
                                Cancel
                              </Button>
                            </HStack>
                          </VStack>
                        ) : (
                          <Text mt={2}>{reply.content}</Text>
                        )}
                      </Box>
                    ))}
                  </VStack>
                )}

                {/* Reply Form */}
                {replyingTo === index ? (
                  <VStack spacing={3} mt={3} align="stretch">
                    <Input
                      placeholder="Your name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <Textarea
                      placeholder="Your reply"
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />
                    <HStack>
                      <Button
                        colorScheme="blue"
                        onClick={() => handleAddReply(index)}
                      >
                        Submit Reply
                      </Button>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                ) : (
                  <Button
                    mt={3}
                    size="sm"
                    colorScheme="blue"
                    onClick={() => setReplyingTo(index)}
                  >
                    Reply
                  </Button>
                )}
              </Box>
            ))}
          </VStack>

          {/* Add Comment Form */}
          <VStack spacing={3} mt={6} align="stretch">
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              Add a Comment
            </Text>
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Textarea
              placeholder="Your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button colorScheme="blue" onClick={handleAddComment}>
              Submit Comment
            </Button>
          </VStack>

          {/* Navigation Controls */}
          <HStack justifyContent="space-between" mt={6}>
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={onBack}
              alignSelf="flex-start"
            >
              Back to Threads
            </Button>
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
};

export default ThreadDetails;

